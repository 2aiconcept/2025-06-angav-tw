describe("Page de connexion (Login)", () => {
  const baseUrl = "http://localhost:4200";

  beforeEach(() => {
    cy.visit(baseUrl + "/signin");
  });

  it("affiche le formulaire de connexion", () => {
    cy.get("form").should("exist");
    cy.contains("Connexion");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="text"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("affiche des erreurs de validation si champs vides", () => {
    cy.get("form").submit();
    cy.contains("L'email est obligatoire");
    cy.contains("Le mot de passe est obligatoire");
  });

  it("affiche une erreur si identifiants invalides", () => {
    cy.get('input[type="email"]').type("fakeuser@mini-crm.com");
    cy.get('input[type="text"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Email ou mot de passe incorrect");
  });

  it("connecte et redirige vers le dashboard avec de bons identifiants", () => {
    cy.get('input[type="email"]').type("test4@mini-crm.com");
    cy.get('input[type="text"]').type("Admin"); // Remplace par le vrai mot de passe si besoin
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard");
  });
});
