describe("2개의 숫자를 다루는 계산기", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });
  it("2개의 숫자에 대해 덧셈 가능", () => {
    cy.get("#num1").type("1");
    cy.get("#num2").type("2");
    cy.get("#submit").click();
    cy.get("#result").should("have.text", "3");
  });
});
