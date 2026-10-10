import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('training is awaited and overlapping training/prediction blocked',async()=>{
 let finish,fitCalls=0;
 const fitPromise=new Promise(resolve=>finish=resolve);
 const model={compile(){},fit(){fitCalls++;return fitPromise;},dispose(){}};
 const context={
  document:{getElementById:()=>({textContent:''})},
  Webcam:class {},RPSDataset:class {encodeLabels(){this.ys={dispose(){}};}},
  window:{addEventListener(){}},console,
  tf:{sequential:()=>model,layers:{flatten:()=>({}),dense:()=>({})},train:{adam:()=>({})},nextFrame:async()=>{}}
 };
 vm.createContext(context);
 const source=fs.readFileSync('index.js','utf8').replace(/init\(\)\.catch\([\s\S]*$/,'');
 vm.runInContext(source+';ready=true;rockSamples=paperSamples=scissorsSamples=1;mobilenet={outputs:[{shape:[null,1,1,1]}]};globalThis.api={train,startPredicting,state:()=>({training,isPredicting})};',context);
 const run=context.api.train();
 assert.equal(context.api.state().training,true);
 await context.api.train();context.api.startPredicting();
 assert.equal(fitCalls,1);assert.equal(context.api.state().isPredicting,false);
 finish();await run;
 assert.equal(context.api.state().training,false);
});
