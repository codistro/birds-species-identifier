from PIL import Image
from torchvision import transforms
from model.BirdsSpecies import BirdsSpecies
from model.classes import classes
import torch

class Classifier():

    def __init__(self, image, top=5):

        self.img = Image.open(image).convert('RGB')
        self.top = top
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        self.img = self.transform(self.img).unsqueeze(0)

        self.net = BirdsSpecies()

        self.softmax = torch.nn.Softmax(dim=1)

        self.class_idx = self.idx_to_class()

    def idx_to_class(self):

        self.idx_to_class = {}

        for k,v in classes.items():
            self.idx_to_class[v] = k

    def classify(self):

        pred = self.softmax(self.net(self.img))
        res, indicies = torch.sort(pred, descending=True)
        res, indicies = res.squeeze(0), indicies.squeeze(0)
        top_n = res[:self.top]
        top_res = []
        for i in range(self.top):
            top_res.append(self.idx_to_class[indicies[i].item()])
        return top_res, top_n.tolist()
