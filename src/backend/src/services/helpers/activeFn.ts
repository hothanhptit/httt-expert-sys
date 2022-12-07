const LOW = 1;
const IDEA = 2;
const PRE_HIGH = 3;
const HIGH = 4;
const NOT_CACULATED = 5;
const DANGER = 5;

export const bmi = (weight: number, height: number) => {
  height = height / 100;
  return (weight / (height * height)).toFixed(1);
};

export const bloodPressure = (diastolic: number, systolic: number) => {
  const lowDiastolic = 60;
  const lowSystolic = 90;

  const ideaDiastolic = 80;
  const ideaSystolic = 120;

  const preHighDiastolic = 90;
  const preHighSystolic = 140;

  const highDiastolic = 91;
  const highSystolic = 141;

  if (diastolic < lowDiastolic || systolic < lowSystolic) {
    return LOW;
  }
  if (diastolic < ideaDiastolic || systolic < ideaSystolic) {
    return IDEA;
  }
  if (diastolic < preHighDiastolic || systolic < preHighSystolic) {
    return PRE_HIGH;
  }
  if (diastolic >= highDiastolic || systolic >= highSystolic) {
    return HIGH;
  }
  return NOT_CACULATED;
};

enum sex {
  MALE = 0,
  FEMALE = 1,
}
export const cholesterols = (
  ldl: number,
  hdl: number,
  totalCholesterols: number,
  triglycerides: number,
  sex: sex
) => {
  const normalTotalCholesterols = 199;
  const atRiskTotalCholesterols = 200;
  const dangegousTotalCholesterols = 240;
  const triglyceridesLevel = 0.2;

  if (totalCholesterols) {
    if (totalCholesterols >= normalTotalCholesterols) {
      return IDEA;
    }
    if (
      totalCholesterols >= atRiskTotalCholesterols &&
      totalCholesterols < dangegousTotalCholesterols
    ) {
      return PRE_HIGH;
    }
    if (totalCholesterols < 200) {
      return HIGH;
    }
  } else if (ldl && hdl && triglycerides) {
    const totalCholesterols = ldl + hdl + triglyceridesLevel * triglycerides;

    if (totalCholesterols >= normalTotalCholesterols) {
      return IDEA;
    }
    if (
      totalCholesterols >= atRiskTotalCholesterols &&
      totalCholesterols < dangegousTotalCholesterols
    ) {
      return PRE_HIGH;
    }
    if (totalCholesterols < 200) {
      return HIGH;
    }
  }

  return NOT_CACULATED;
};
export const glycemicIndex = (gi: number) => {
  const NORMAL = 99;
  const PREDIABETES = 100;
  const DIABETES = 126;

  const GI_NORMAL = 1;
  const GI_PREDIABETES = 2;
  const GI_DIABETES = 3;
  const GI_UNCACULATED = 4;

  if (gi > DIABETES) return GI_DIABETES;
  if (gi > PREDIABETES) return GI_PREDIABETES;
  if (gi < NORMAL && gi > 0) return GI_NORMAL;
  return GI_UNCACULATED;
};

export const heartbeat = (heartbeat: number, age: number) => {
  const INFANT = 1;
  const TODDLER = 3;
  const PRESCHOOL = 5;
  const SCHOOL = 12;
  const ADULT = 18;

  if (age <= INFANT && (heartbeat <= 100 || heartbeat >= 180)) return DANGER;
  if (age <= TODDLER && (heartbeat <= 98 || heartbeat >= 140)) return DANGER;
  if (age <= PRESCHOOL && (heartbeat <= 80 || heartbeat >= 120)) return DANGER;
  if (age <= SCHOOL && (heartbeat <= 75 || heartbeat >= 118)) return DANGER;
  if (age > ADULT && (heartbeat <= 60 || heartbeat >= 100)) return DANGER;

  return IDEA;
};
