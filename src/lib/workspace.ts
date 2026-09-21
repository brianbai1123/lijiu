import {
  categories,
  type Category,
  type CategoryId,
  type Principle,
} from "@/data/principles";
import { groupByCategory } from "@/lib/group-by-category";

/** 七个领域循环四色点，和设计稿工作台一致 */
export const CATEGORY_DOT: Record<CategoryId, string> = {
  cognition: "#ff3d7f",
  character: "#4d8dff",
  relations: "#19d4b2",
  action: "#f5a524",
  risk: "#ff3d7f",
  adversity: "#4d8dff",
  meaning: "#19d4b2",
};

export type WorkspaceGroup = {
  category: Category;
  items: Principle[];
};

export function groupPrinciples(list: Principle[]): WorkspaceGroup[] {
  return groupByCategory(categories, list);
}
