import { routes } from '@constants/index'
import '@cypress/support/stubs'
import { route } from '@lib/utils'
import { SignUpFormFieldsType } from '@pages/account/sign-up'

console.clear()

const testUser: SignUpFormFieldsType = {
   fullName: 'Test User',
   email: 'contact@elementira.com',
   password: 'test-password'
}

const signOut = () => {
   cy.element('userMenu').click()

   cy.element('signOutButton').click()

   cy.wait(750).getCookie('__Secure-next-auth.session-token').should('not.exist')
}

describe('Authentication e2e', () => {
   before(() => {
      cy.exec('ts-node scripts/db/user.ts deleteTestUsers')
   })

   after(() => {
      cy.exec('ts-node scripts/db/user.ts deleteTestUsers')
   })

   it('tests sign up, sign in, sign out and reset password actions', () => {
      /*
       * Sign up
       * */
      cy.intercept({
         method: routes.api.account.signUp.method,
         url: `${routes.api.account.signUp.path}*`
      }).as('signUp')

      cy.visit(route({ path: routes.page.account.signUp, host: true }))

      cy.element('signUpForm').find('[name="fullName"]').type(testUser.fullName)
      cy.element('signUpForm').find('[name="email"]').type(testUser.email)
      cy.element('signUpForm').find('[name="password"]').type(testUser.password)

      cy.element('signUpForm').submit()

      cy.wait('@signUp').then(interception => {
         const response = interception.response

         expect(response?.statusCode).equal(200)

         cy.wait(750).getCookie('__Secure-next-auth.session-token').should('exist')
      })

      /*
       * Sign out
       * */
      signOut()

      /*
       * Sign in
       * */
      cy.intercept({
         method: routes.api.account.signIn.method,
         url: `${routes.api.account.signIn.path}*`
      }).as('signIn')

      cy.visit(route({ path: routes.page.account.signIn, host: true }))

      cy.element('signInForm').find('[name="email"]').type(testUser.email)
      cy.element('signInForm').find('[name="password"]').type(testUser.password)

      cy.element('signInForm').submit()

      cy.wait('@signIn').then(interception => {
         const response = interception.response

         expect(response?.statusCode).equal(200)

         cy.wait(750).getCookie('__Secure-next-auth.session-token').should('exist')

         signOut()
      })

      /*
       * Reset password
       * */
      cy.intercept({
         method: routes.api.account.resetPassword.method,
         url: `${routes.api.account.resetPassword.path}*`
      }).as('resetPassword')

      cy.visit(route({ path: routes.page.account.signIn, host: true }))

      cy.element('resetPasswordButton').click()

      cy.element('resetPasswordForm').find('[name="email"]').type(testUser.email)

      cy.element('resetPasswordForm').submit()

      cy.wait('@resetPassword').then(interception => {
         const response = interception.response

         expect(response?.statusCode).equal(200)
      })
   })
})
