// Copyright 2019 The TensorFlow Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

/**
 * A class that wraps webcam video elements to capture Tensor4Ds.
 */


class Webcam {
  constructor(element) { this.webcamElement=element; this.stream=null; }
  async setup() {
    try {
    this.stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    this.webcamElement.srcObject=this.stream;
    await new Promise((resolve,reject)=>{
      if(this.webcamElement.readyState>=2) return resolve();
      this.webcamElement.onloadeddata=resolve;this.webcamElement.onerror=reject;
    });
    await this.webcamElement.play();
    } catch(error) { this.stop(); throw error; }
  }
  capture() {
    return tf.tidy(()=>{
      let image=tf.browser.fromPixels(this.webcamElement);
      const [h,w]=image.shape,side=Math.min(h,w);
      image=image.slice([Math.floor((h-side)/2),Math.floor((w-side)/2),0],[side,side,3]);
      image=tf.image.resizeBilinear(image,[224,224]);
      image=image.toFloat().div(127.5).sub(1);
      return image.expandDims(0);
    });
  }
  stop() { this.stream?.getTracks().forEach(track=>track.stop());this.stream=null;this.webcamElement.srcObject=null; }
}
