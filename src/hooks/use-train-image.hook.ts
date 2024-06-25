import { TrainImage } from "../enums";
import trainImage1 from "../assets/trains/train_1.svg";
import trainImage2 from "../assets/trains/train_2.svg";
import trainImage3 from "../assets/trains/train_3.svg";
import trainImage4 from "../assets/trains/train_4.svg";
import trainImage5 from "../assets/trains/train_5.svg";
import { useMemo } from "react";

export const useTrainImage = (trainImage: TrainImage): string => {
  const imagePath = useMemo(() => {
    switch (trainImage) {
      case TrainImage.TRAIN_1:
        return trainImage1;
      case TrainImage.TRAIN_2:
        return trainImage2;
      case TrainImage.TRAIN_3:
        return trainImage3;
      case TrainImage.TRAIN_4:
        return trainImage4;
      case TrainImage.TRAIN_5:
        return trainImage5;
      default:
        return trainImage1;
    }
  }, [trainImage]);
  return imagePath;
};
