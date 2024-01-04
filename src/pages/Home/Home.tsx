import React from 'react';
import { useLocalization } from '../../contexts/locale.context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

export const Home: React.FC = () => {
  const { t } = useLocalization();
  const user = useSelector((state: RootState) => state.user.value);

  const htmlCode1 = `<span class="keyword">query</span> <span class="bracket2">{</span>
   <span class="word">user</span><span class="bracket">(</span><span class="word">id</span>: <span class="bracket">1)</span> <span class="bracket">{</span>
      <span class="word">name</span>
      <span class="word">email</span>
   <span class="bracket">}</span>
<span class="bracket2">}</span>`;

  const htmlCode2 = `<span class="keyword">query</span><span class="bracket">(</span>$id: <span class="keyword">ID</span>!<span class="bracket">)</span> <span class="bracket2">{</span>
   <span class="word">user</span><span class="bracket">(</span><span class="word">id</span>: $id<span class="bracket">)</span> <span class="bracket">{</span>
      <span class="word">name</span>
      <span class="word">id</span>
   <span class="bracket">}</span>
<span class="bracket2">}</span>`;

  const htmlCode3 = `<span class="bracket2">{</span>
   <span class="word">"id"</span>: <span class="bracket">1</span>
<span class="bracket2">}</span>`;

  return (
    <section className="welcome">
      <div className="welcome__links">
        {user === null ? (
          <>
            <Link
              className="button button_medium"
              to="/login"
              title={t.Login}
              aria-label={t.Login}
            >
              {t.SignIn}
            </Link>
            <Link
              className="button button_medium"
              to="/register"
              title={t.Register}
              aria-label={t.Register}
            >
              {t.SignUp}
            </Link>
          </>
        ) : (
          <Link
            className="button button_medium"
            to="/graph-ql"
            title={t.MainPage}
            aria-label={t.MainPage}
          >
            {t.MainPage}
          </Link>
        )}
      </div>
      <h2 className="h2">{t.GraphQLPlayground}</h2>
      <div className="welcome__paragraph text">
        <p>{t.WelcomePage_p1}</p>
        <p>{t.WelcomePage_p2}</p>
        <p>{t.WelcomePage_p3}</p>
        <p>{t.WelcomePage_p4}</p>
        <p>{t.WelcomePage_p5}</p>
        <p>{t.WelcomePage_p6}</p>
      </div>
      <h2 className="h2">{t.AboutCourse}</h2>
      <div className="welcome__paragraph text">
        <p>
          {t.ThisIsPartOfRSS} &nbsp;
          <a
            href="https://github.com/rolling-scopes-school/tasks/tree/master/react"
            target="_blank"
          >
            RS School. React
          </a>
        </p>
        <p>{t.CourseIncludes}</p>
        <ul className="welcome__list">
          <li>{t.Components}</li>
          <li>{t.Routing}</li>
          <li>{t.Tests}</li>
          <li>{t.ContextAPI}</li>
          <li>{t.ReduxRTK}</li>
          <li>{t.NextJSSSRSSG}</li>
          <li>{t.FormsValidation}</li>
        </ul>
      </div>

      <h2 className="h2">{t.Developers}</h2>
      <div className="welcome__paragraph  text">
        <ul className="welcome__developers">
          <li className="welcome__developer">
            <div className="welcome__developer-photo">
              <img
                className="welcome__developer-img"
                src="/src/assets/img/angelina.svg"
                alt={t.Angelina}
              />
            </div>
            <h3 className="h3">
              <a href="https://github.com/ritter1111" target="_blank">
                {t.Angelina}
              </a>
            </h3>
            <p>{t.ProjectSetup}</p>
            <p>{t.DocumentationExplorer}</p>
            <p>{t.VariablesSection}</p>
            <p>{t.Localization}</p>
          </li>
          <li className="welcome__developer">
            <div className="welcome__developer-photo">
              <img
                className="welcome__developer-img"
                src="/src/assets/img/alex.jpeg"
                alt={t.Alexey}
              />
            </div>
            <h3 className="h3">
              <a href="https://github.com/zweroboy1" target="_blank">
                {t.Alexey}
              </a>
            </h3>
            <p>{t.StylesAndDesign}</p>
            <p>{t.RegistrationPage}</p>
            <p>{t.WelcomePage}</p>
            <p>{t.ChangeEndpointSection}</p>
          </li>
          <li className="welcome__developer">
            <div className="welcome__developer-photo">
              <img
                className="welcome__developer-img"
                src="/src/assets/img/alena.jpg"
                alt={t.Alena}
              />
            </div>

            <h3 className="h3">
              <a href="https://github.com/alenzija" target="_blank">
                {t.Alena}
              </a>
            </h3>
            <p>{t.QueryEditor}</p>
            <p>{t.LoginPage}</p>
            <p>{t.Prettifying}</p>
            <p>{t.ResponseSection}</p>
          </li>
        </ul>
      </div>

      <h2 className="h2">{t.HowToUseGraphQLPlayground}</h2>

      <div className="welcome__paragraph text">
        <p>{t.PlaygroundDescription}</p>
        <h3 className="h3">{t.WriteYourQueryOrMutation}</h3>
        <h4 className="h4">{t.ExampleQuery}</h4>
        <pre
          className="welcome__code"
          dangerouslySetInnerHTML={{ __html: htmlCode1 }}
        />
        <h3 className="h3">{t.UseVariables}</h3>
        <p>{t.VariablesDescription}</p>
        <h4 className="h4">{t.ExampleWithVariables}</h4>
        <pre
          className="welcome__code"
          dangerouslySetInnerHTML={{ __html: htmlCode2 }}
        />
        <h4 className="h4">{t.Variables}:</h4>
        <pre
          className="welcome__code"
          dangerouslySetInnerHTML={{ __html: htmlCode3 }}
        />
      </div>
    </section>
  );
};
