export interface ProofImage {
  src: string;
  title: string;
  category?: string;
  description?: string;
  isPdf?: boolean;
  pages?: number;
}

export interface PdfEvidenceDocument {
  id: string;
  stepNumber: string;
  workflowStep: number;
  label: string;
  fileName: string;
  pdfPath: string;
  workflowRole: string;
  demonstrates: string;
  pages: number;
  context: {
    project: string;
    scope: string;
    preparedBy: string;
    keyPoints: string[];
    qaStatus: string;
  };
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

export interface ToolCategory {
  category: string;
  description: string;
  tools: {
    name: string;
    role: string;
    icon?: string;
    highlight?: boolean;
    badge?: string;
  }[];
}
