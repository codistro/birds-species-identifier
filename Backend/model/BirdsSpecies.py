import torch
import torchvision

class BirdsSpecies(torch.nn.Module):

    def __init__(self, classes=275) -> None:
        super().__init__()

        output_size = classes
        self.net = torchvision.models.resnet50()

        in_features = self.net.fc.in_features

        self.net.fc = torch.nn.Linear(in_features, out_features=output_size)
        self.net.load_state_dict(torch.load('weights//birds.pt', map_location=torch.device('cpu')))

    def forward(self, img):
        return self.net(img)


