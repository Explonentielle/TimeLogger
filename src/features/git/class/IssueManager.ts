import { IssueType } from "../../../types/issue";
import { Issue } from "./Issue";

export class IssueManager {
  accessToken: string;
  userData: Promise<{ id: string } | null>;
  issues: Issue[];

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.userData = this.fetchUserId();
    this.issues = [];
  }

  // Méthode pour récupérer l'utilisateur GitLab
  async fetchUserId(): Promise<{ id: string } | null> {
    try {
      const res = await fetch("https://gitlab.com/api/v4/user", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erreur d'authentification");
      }

      const userData = await res.json();
      return { id: userData.id };
    } catch (error) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
  }

  // Méthode pour récupérer les issues assignées à l'utilisateur
  async fetchAssignedIssues(): Promise<Issue[]> {
    try {
      const user = await this.userData;
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      const res = await fetch(
        `https://gitlab.com/api/v4/issues?assignee_id=${user.id}`,
        { headers: { Authorization: `Bearer ${this.accessToken}` } }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `${errorText}`
        );
      }

      const issueData = await res.json(); // JSON brut avant de le mapper
      this.issues = issueData.map((issue: IssueType) => new Issue(issue));
      return this.issues;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des issues");
    }
  }

  public getIssues() {
    return this.issues
  }
}
