export interface SurveyWorkflow {
  workflow: WorkflowItem[];
}

export interface WorkflowItem {
  id: number;
  text: string;
  type: string;
  parent: number;
  placeholder?: string;
}
