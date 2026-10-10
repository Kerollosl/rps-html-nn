import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as tf from '@tensorflow/tfjs';
const context={tf:{...tf,browser:{fromPixels:()=>tf.fill([48,80,3],255,'int32')}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync("webcam.js",'utf8')+';globalThis.WebcamClass=Webcam;',context);
test('camera preprocessing has correct shape, scale and bounded tensor memory',()=>{
 const camera=new context.WebcamClass({});const baseline=tf.memory().numTensors;
 for(let i=0;i<100;i++){
  const tensor=camera.capture();assert.deepEqual(tensor.shape,[1,224,224,3]);
  assert.equal(tensor.dataSync()[0],1);tensor.dispose();
 }
 assert.equal(tf.memory().numTensors,baseline);
});
test('camera tracks released on playback failure',async()=>{
 let stopped=0;
 context.navigator={mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop:()=>stopped++}]})}};
 const element={readyState:2,play:async()=>{throw Error('playback denied');}};
 const camera=new context.WebcamClass(element);
 await assert.rejects(camera.setup(),/playback denied/);
 assert.equal(stopped,1);assert.equal(element.srcObject,null);
});
