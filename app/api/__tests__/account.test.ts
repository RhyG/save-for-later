import React from 'react';

describe('AccountAPI', () => {
  describe('.signIn', () => {
    it.todo('Should call signIn on the auth service and return the user if successful.');
    it.todo('Should call signIn on the auth service and throw an error if unsuccessful.');
  });

  describe('.submitOTP', () => {
    it.todo('Should verify the OTP with the auth service and return a user and session if successful.');
    it.todo('Should throw an error if verification is unsuccessful.');
  });

  describe('.signOut', () => {
    it.todo('Should call signout on the auth service.');
  });
});
