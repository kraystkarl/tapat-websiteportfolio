export interface ProofImage {
  src: string;
  title: string;
  category: string;
  description: string;
  isPdf?: boolean;
  pages?: number;
}

export interface ProofStepItem {
  id: string;
  stepNumber: string;
  name: string;
  tool: string;
  title: string;
  description: string;
  storyContext: {
    unclearOrGoal: string;
    actionTaken: string;
    outcome: string;
  };
  images: ProofImage[];
}

export interface MethodologyStep {
  number: string;
  title: string;
  shortDesc: string;
  details: string[];
}
