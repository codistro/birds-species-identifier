# birds-species-identifier

![alt text](https://github.com/codistro/birds-species-identifier/blob/main/demo.PNG "Demo")

An End to End deep learning project for identifying 250+ bird species.
React is used for frontend and flask as backend
PyTorch is used for training the deep-learning model

# Dataset

Dataset is taken from [kaggle](https://www.kaggle.com/gpiosenka/100-bird-species), which has 275 species dataset.


# Training

ResNet-50 model is trained on Google colab pro which is implemented in PyTorch deep learning framework.

Achieved 99.9% accuracy on trainig set and 97.1% on test set, there is a chance of imrovement by adding data augmentation. 
It is observed that model struggle to identifies birds with front profiles.
