import React from 'react';
import Mailto from 'react-mailto';
import ChangePasswordContainer from 'containers/ChangePasswordContainer';
import DeactivateContainer from 'containers/DeactivateContainer';

export default () => (
  <div className="mdl-card settings">
    <div className="card-inner py-4">
      <h2>
        Settings
      </h2>
      <hr className="mt-3 mb-5" />
      <section>
        <ChangePasswordContainer />
      </section>
      <hr className="my-5" />
      <section>
        <h3>
          Help &amp; Support
        </h3>
        <p>
          Have a question? Please send us an email at &nbsp;
          <Mailto email="support@pumpthq.com" obfuscate={true} target="_blank">
            support@pumpthq.com
          </Mailto>
        </p>
      </section>
      <hr className="my-5" />
      <section>
        <DeactivateContainer />
      </section>
  </div>
</div>
)
