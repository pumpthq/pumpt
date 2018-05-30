import React from 'react';
import Mailto from 'react-mailto';
import ChangePasswordContainer from 'containers/ChangePasswordContainer';
import DeactivateContainer from 'containers/DeactivateContainer';
import './settings.less';

export default () => (
  <div className="mdl-card col-xs-12">
    <div className="settings">
      <h2>
        Settings
      </h2>

      <section>
    <ChangePasswordContainer />
  </section>

      <section>
    <h3 className="heading heading_type_three">
      Help &amp; Support
    </h3>
    <p>
      Have a question? Please send us an email at &nbsp;
      <Mailto email="support@pumpthq.com" obfuscate={true} target="_blank">
        support@pumpthq.com
      </Mailto>
    </p>
  </section>

      <section>
    <DeactivateContainer />
  </section>
  </div>
  </div>
)
