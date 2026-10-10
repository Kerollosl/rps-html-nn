# Webcam gesture classifier

A browser-trained rock/paper/scissors classifier. Serve the folder over localhost (`python -m http.server 8000`), allow camera access, collect examples for every class, train, then predict. This demonstration supplies gesture classification; it does not implement an opponent or score a game. TensorFlow.js is pinned; retraining releases previous models and tensors.
