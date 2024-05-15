describe('multiple-react-versions', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
  })
  it('should load the app', () => {
    cy.get('h1').should('contain', 'Basic Host-Remote');
    cy.get('h2').should('contain', 'App 1, Uses react version not compatible with hooks');
  });

  it('should have runtime plugin wrapper', () => {
    cy.get('p').should('contain', 'In RUNTIME PLUGIN WRAPPER');
  });

  it('should have hooks component', () => {
    cy.get('strong').contains('This Component uses hooks, if loaded on localhost:3001, it should work, even though that host does not support React Hooks')
  });

  it('should load the remote button', () => {
    cy.get('div').contains('Loading Button').should('not.exist');
    cy.get('button').should('exist');
  });

  it('should render the host app title', () => {
    cy.get('h1').should('have.text', 'Basic Host-Remote');
  });


  it('should render the input placeholder', () => {
    cy.get('input').should('have.attr', 'placeholder', 'Type something into this input');
  });

  it('should render the modern component wrapper', () => {
    cy.get('div').contains('In RUNTIME PLUGIN WRAPPER').should('exist');
    cy.get('div').contains('Host React: 16.6.3 Remote React: 17.0.2').should('exist');
  });

  it('should render the modern component text', () => {
    cy.get('div').contains('This Component uses hooks, if loaded on localhost:3001, it should work, even though that host does not support React Hooks').should('exist');
  });

  it('should render the App2 component wrapper', () => {
    cy.get('div').contains('In RUNTIME PLUGIN WRAPPER').should('exist');
    cy.get('div').contains('Host React: 16.6.3 Remote React: 17.0.2').should('exist');
  });

  it('should render the App2 component text', () => {
    cy.get('p').contains('More react components from App2 using non-legacy React to render').should('exist');
  });

  it('should render the App2 button', () => {
    cy.get('button').should('have.text', 'App 2 Button');
  });
  it('should container other wrapped component ', () => {
    cy.get('p').contains('More react components from App2 using non-legacy React to render');
  });
});
