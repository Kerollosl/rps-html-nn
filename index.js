let mobilenet;
let mobilenetOwner;
let model;
const webcam = new Webcam(document.getElementById("wc"));
const dataset = new RPSDataset();
var rockSamples = 0,
  paperSamples = 0,
  scissorsSamples = 0;
let isPredicting = false;
let training = false;
let loopActive = false;
let ready = false;

async function loadMobilenet() {
  const mobilenet = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
  );
  mobilenetOwner = mobilenet;
  const layer = mobilenet.getLayer("conv_pw_13_relu");
  const features=tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
  return features;
}

async function train() {
  if (training || !ready || !rockSamples || !paperSamples || !scissorsSamples) return;
  training = true; isPredicting = false;
  while (loopActive) await tf.nextFrame();
  try {
  model?.dispose();
  dataset.ys?.dispose();
  dataset.ys = null;
  dataset.encodeLabels(3);
  model = tf.sequential({
    layers: [
      tf.layers.flatten({ inputShape: mobilenet.outputs[0].shape.slice(1) }),
      tf.layers.dense({ units: 100, activation: "relu" }),
      tf.layers.dense({ units: 3, activation: "softmax" }),
    ],
  });
  const optimizer = tf.train.adam(0.0001);
  model.compile({ optimizer: optimizer, loss: "categoricalCrossentropy" });
  let loss = 0;
  await model.fit(dataset.xs, dataset.ys, {
    epochs: 10,
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        loss = logs.loss.toFixed(5);
        console.log("LOSS: " + loss);
      },
    },
  });
  } catch(error) {model?.dispose();model=null;document.getElementById("prediction").textContent=`Training failed: ${error.message}`;} finally { training = false; }
}

function handleButton(elem) {
  if (!ready || training || isPredicting) return;
  switch (elem.id) {
    case "0":
      rockSamples++;
      document.getElementById("rocksamples").innerText =
        "Rock samples:" + rockSamples;
      break;
    case "1":
      paperSamples++;
      document.getElementById("papersamples").innerText =
        "Paper samples:" + paperSamples;
      break;
    case "2":
      scissorsSamples++;
      document.getElementById("scissorssamples").innerText =
        "Scissors samples:" + scissorsSamples;
      break;
  }
  const label = parseInt(elem.id);
  const img = webcam.capture();
  const activation = tf.tidy(() => mobilenet.predict(img));
  dataset.addExample(activation, label);
  img.dispose(); activation.dispose();
}

async function predict() {
  if (loopActive || training || !model) return;
  loopActive = true;
  try {
  while (isPredicting) {
    const predictedClass = tf.tidy(() => {
      const img = webcam.capture();
      const activation = mobilenet.predict(img);
      const predictions = model.predict(activation);
      return predictions.as1D().argMax();
    });
    const classId = (await predictedClass.data())[0];
    var predictionText = "";
    switch (classId) {
      case 0:
        predictionText = "I see Rock";
        break;
      case 1:
        predictionText = "I see Paper";
        break;
      case 2:
        predictionText = "I see Scissors";
        break;
    }
    document.getElementById(
      "prediction"
    ).innerHTML = `<span style="font-size: 48px; color: red;">${predictionText}</span>`;
    predictedClass.dispose();
    await tf.nextFrame();
  }
  } finally { loopActive = false; }
}

function doTraining() {
  train();
}

function startPredicting() {
  if (training || !model) return;
  isPredicting = true;
  predict();
}

function stopPredicting() {
  isPredicting = false;
}

async function init() {
  await webcam.setup();
  const webcamElement = document.getElementById("wc");
  webcamElement.classList.add("mirrored");
  mobilenet = await loadMobilenet();
  ready = true;
  tf.tidy(() => mobilenet.predict(webcam.capture()));
}

window.addEventListener('pagehide',()=>{ isPredicting=false;webcam.stop();setTimeout(()=>{model?.dispose();mobilenetOwner?.dispose();dataset.xs?.dispose();dataset.ys?.dispose();},0); });
init().catch(error=>{document.getElementById('prediction').textContent=`Camera/model unavailable: ${error.message}`;webcam.stop();});

