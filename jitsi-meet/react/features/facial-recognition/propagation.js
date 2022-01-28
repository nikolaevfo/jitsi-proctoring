import logger from "./logger";

function checkIsLeftRightViolation(chinLeftEar, rightEarChin) {
    return (
        chinLeftEar / rightEarChin > 1.16 || chinLeftEar / rightEarChin < 0.86
    );
}

function checkIsUpDouwnViolation(chinLeftEar, rightEarChin, noseChin) {
    return (
        (noseChin * 2) / (chinLeftEar + rightEarChin) < 0.8 ||
        (noseChin * 2) / (chinLeftEar + rightEarChin) > 0.98
    );
}

export function checkIsViolation(detections) {
    // позиции на landmarks
    const leftEarPos = detections[0].landmarks._positions[0];
    const chinPos = detections[0].landmarks._positions[8];
    const rightEarPos = detections[0].landmarks._positions[16];
    const nosePos = detections[0].landmarks._positions[27];

    const chinLeftEar = Math.sqrt(
        Math.pow(chinPos._x - leftEarPos._x, 2) +
            Math.pow(chinPos._y - leftEarPos._y, 2)
    );
    const rightEarChin = Math.sqrt(
        Math.pow(rightEarPos._x - chinPos._x, 2) +
            Math.pow(rightEarPos._y - chinPos._y, 2)
    );
    const noseChin = Math.sqrt(
        Math.pow(nosePos._x - chinPos._x, 2) +
            Math.pow(nosePos._y - chinPos._y, 2)
    );

    const isLeftRightViolation = checkIsLeftRightViolation(
        chinLeftEar,
        rightEarChin
    );
    const isUpDouwnViolation = checkIsUpDouwnViolation(
        chinLeftEar,
        rightEarChin,
        noseChin
    );

    if (isLeftRightViolation || isUpDouwnViolation) {
        return true;
    }

    return false;
}
