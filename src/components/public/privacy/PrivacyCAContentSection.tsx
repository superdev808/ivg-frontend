import classNames from "classnames/bind";

import styles from "./Privacy.module.scss";

const cx = classNames.bind(styles);

export const PrivacyCAContentSection = () => (
  <div>
    <div
      className={cx("section-header", "p-4 md:p-6 bg-dark-green text-beige")}
    >
      <span className="text-2xl md:text-5xl font-bold z-1">
        ADDITIONAL INFORMATION FOR CALIFORNIA RESIDENTS
      </span>
    </div>
    <div className="flex justify-content-center text-light-green">
      <div
        className={cx(
          "wrapper",
          "flex flex-column justify-content-center line-height-3 text-lg"
        )}
      >
        <p>
          <span>
            Pursuant to California law, we are providing additional information
            to California residents. Please read this information together with
            our Privacy &amp; Cookie Notice.
          </span>
        </p>
        <p>
          <span>
            Under California law, certain organizations need to disclose whether
            the following categories of &ldquo;personal information&rdquo; are
            collected or disclosed for an organization&rsquo;s &ldquo;business
            purpose&rdquo; as those terms are defined under California law.
            Below please find the categories of personal information about
            California residents that we collect or disclose to third parties or
            service providers. Note that while a category may be included below
            that does not necessarily mean that we have or collect information
            in that category about you. The personal information we collect
            depends on the nature of our interaction with you and the Services
            you may use. For example, while we collect credit card numbers for
            customers who purchase certain solutions, we do not collect or
            transfer credit card numbers of individuals that submit questions on
            our website&rsquo;s &ldquo;contact us&rdquo; page. We do not
            &ldquo;sell&rdquo; and/or &ldquo;share&rdquo; (as those terms are
            defined by California law) personal information.
          </span>
        </p>
        <table>
          <thead>
            <tr>
              <th className="border-1 py-3 md:w-6">
                <strong>Category of personal information collected</strong>
              </th>
              <th className="border-1  py-3">
                <strong>
                  Categories of third parties to whom we disclose personal
                  information for a business purpose
                </strong>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-1">
                <span>
                  Identifiers such as a real name, alias, postal address, unique
                  personal identifier, online identifier, internet protocol
                  address, email address, account name, social security number,
                  driver&rsquo;s license number, passport number, or other
                  similar identifiers.*
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Data analytics providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                  <li>
                    <span>Government authorities and regulators</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Financial information such as credit card number, debit card
                  number or bank account number
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Payment processors and banks</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Characteristics of protected classifications under California
                  or federal law
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Government authorities and regulators</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Commercial information, including records of personal
                  property, products or services purchased, obtained, or
                  considered, or other purchasing or consuming histories or
                  tendencies.
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Internet or other electronic network activity information,
                  including, but not limited to, browsing history, search
                  history, and information regarding a consumer&rsquo;s
                  interaction with an Internet website, application, or
                  advertisement.
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Data analytics providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>Geolocation data</span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Audio, electronic, visual, thermal, olfactory, or similar
                  information.
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                  <li>
                    <span>Government authorities and regulators</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>Professional or employment-related information</span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-1">
                <span>
                  Education information, defined as information that is not
                  publicly available personally identifiable information as
                  defined in the Family Educational Rights and Privacy Act (20
                  U.S.C. section 1232g, 34 C.F.R. Part 99).
                </span>
              </td>
              <td className="border-1">
                <ul>
                  <li>
                    <span>Our affiliates or subsidiaries</span>
                  </li>
                  <li>
                    <span>Our service providers</span>
                  </li>
                  <li>
                    <span>Product and service fulfillment companies</span>
                  </li>
                  <li>
                    <span>
                      Subscribing, accrediting or professional organizations
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Sensitive Information Disclosure:</strong>
          <span>&nbsp;</span>
        </p>

        <p>
          <span>
            We may collect the following categories of sensitive personal
            information (as defined under California law): social security,
            driver&rsquo;s license, state identification card, or passport
            number, account log-in, financial account, debit card, or credit
            card number in combination with any required security or access
            code, password, or credentials allowing access to an account, and
            information on racial or ethnic origin, religious, or philosophical
            beliefs, or union membership, and precise geolocation. This
            information is collected in order to process transactions, comply
            with laws, manage our business, or provide you with services. Note
            that we do not use such information for any purposes that are not
            identified within the California Privacy Rights Act Section
            1798.121. We do not &ldquo;sell&rdquo; or &ldquo;share&rdquo;
            sensitive personal information for purposes of cross-context
            behavioral advertising.
          </span>
        </p>

        <p>
          <span>
            We and our third-party service providers collect personal
            information from the following sources:
          </span>
        </p>
        <ul>
          <li>
            <strong>Direct interactions</strong>
            <span>
              , such as, when you register for our services, make a purchase, or
              communicate with us, including through our web chat features
            </span>
          </li>
          <li>
            <strong>Data from third parties</strong>
            <span>
              , such as, information on third-party websites or other
              information you may have made publicly available or information
              provided by third party sources, including but not limited to
              government entities and data resellers
            </span>
          </li>
          <li>
            <strong>Automated tracking technologies</strong>
            <span>
              , such as, information automatically collected about your
              interaction with our Services and websites using various
              technologies such as cookies, web logs and beacons and internet
              tags
            </span>
          </li>
        </ul>

        <p>
          <span>
            Depending on how you interact with us and our Services, we may use
            and disclose personal information for the following business
            purposes:
          </span>
        </p>
        <ul>
          <li>
            <span>Auditing</span>
          </li>
          <li>
            <span>
              Detecting security incidents, protecting against malicious,
              deceptive, fraudulent, or illegal activity,
            </span>
          </li>
          <li>
            <span>Detecting and repairing errors,</span>
          </li>
          <li>
            <span>Performing services on behalf of other businesses,</span>
          </li>
          <li>
            <span>Processing or fulfilling orders and transactions,</span>
          </li>
          <li>
            <span>Processing payments,</span>
          </li>
          <li>
            <span>Providing advertising or marketing,</span>
          </li>
          <li>
            <span>
              Conducting internal research for product and service development,
              and
            </span>
          </li>
          <li>
            <span>Improving, upgrading, and enhancing our services.</span>
          </li>
        </ul>

        <p>
          <span>
            In addition to sharing personal information for the business
            purposes identified within the California Consumer Privacy Act, we
            also disclose personal information as needed, or required, with the
            following additional third parties:
          </span>
        </p>
        <ul>
          <li>
            <strong>Organizations involved in business transfers</strong>
            <span>
              , e.g., to a purchaser or successor entity in the event of a sale
              or any other corporate transaction involving some or all our
              business;
            </span>
          </li>
          <li>
            <strong>Other parties</strong>
            <span>
              , e.g., as needed for external audit, compliance, risk management,
              corporate development and/or corporate governance related matters,
            </span>
          </li>
          <li>
            <strong>Business partners as directed by an individual</strong>
            <span>
              , or as needed to process an individual&rsquo;s request; and
            </span>
          </li>
          <li>
            <strong>Governmental authorities and regulators</strong>
            <span>, as required under applicable law.</span>
          </li>
        </ul>

        <p>
          <strong>
            Exercising Rights to Request Access and Request Deletion:
          </strong>
        </p>

        <p>
          <span>
            Subject to certain exceptions, California residents have the right
            to request access, deletion and portability of their personal
            information as further described in the Privacy &amp; Cookie Notice.
            If you would like to submit a request or have additional questions
            about the personal information that we have about you, please
            contact us at{" "}
          </span>
          <a href="mailto:support@ivoryguide.com">
            <span>support@ivoryguide.com</span>
          </a>
          <span>.</span>
        </p>

        <p>
          <span>
            When you submit your request, we will take steps to attempt to
            verify your identity. We will seek to match the information in your
            request to the personal information we maintain about you. As part
            of our verification process, we may ask you to submit additional
            information, use identity verification services to assist us, or if
            you have set up an account on our website, we may ask you to sign
            into your account as part of our identity verification process.
            Please understand that, depending on the type of request you submit,
            to protect the privacy and security of your personal information, we
            will only complete your request when we are satisfied that we have
            verified your identity to a reasonable degree of certainty.
          </span>
        </p>

        <p>
          <span>
            We do not discriminate against individuals who exercise their rights
            under applicable law.
          </span>
        </p>

        <p>
          <span>
            If we receive a request from an authorized agent, we have the right
            to verify with the data subject that the data subject indeed wants
            to take the action requested by the agent and will do so by
            contacting the data subject directly.
          </span>
        </p>

        <p>
          <em>
            <span>Last Updated January 2024</span>
          </em>
        </p>
      </div>
    </div>
  </div>
);
