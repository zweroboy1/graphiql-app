import React from 'react';
import { useLocalization } from '../../contexts/locale.context';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useLocalization();

  return (
    <section className="welcome">
      <div style={{ margin: '20px' }}>
        <p>{t.WelcomePage_p1}</p>
        <p>{t.WelcomePage_p2}</p>
        <p>{t.WelcomePage_p3}</p>
        <p>{t.WelcomePage_p4}</p>
        <p>{t.WelcomePage_p5}</p>
        <p>{t.WelcomePage_p6}</p>
        <div>
          <Link to="/graph-ql">{t.StartNow}</Link>
        </div>
      </div>
      <div style={{ margin: '20px' }}>
        <p>{t.AboutCourse}</p>
        <p>{t.CourseIncludes}</p>
        <p>{t.Routing}</p>
        <p>{t.TestsContextAPI}</p>
        <p>{t.ReduxRTK}</p>
        <p>{t.NextJSSSRSSG}</p>
        <p>{t.FormsValidation}</p>
      </div>
      <div style={{ margin: '20px' }}>
        <p>{t.Developers}</p>
        <div style={{ margin: '20px' }}>
          <h1>{t.Angelina}</h1>
          <p>{t.Role}</p>
          <p>{t.ProjectSetup}</p>
          <p>{t.DocumentationExplorer}</p>
          <p>{t.VariablesSection}</p>
          <p>{t.Localization}</p>
        </div>
        <div style={{ margin: '20px' }}>
          <h1>{t.Alexey}</h1>
          <p>
            {t.Role} {t.StylesAndDesign}
          </p>
          <p>{t.StylesAndDesign}</p>
          <p>{t.RegistrationPage}</p>
          <p>{t.ChangeEndpointSection}</p>
        </div>
        <div style={{ margin: '20px' }}>
          <h1>{t.Alena}</h1>
          <p>{t.Role} </p>
          <p>{t.QueryEditor}</p>
          <p>{t.LoginPage}</p>
          <p>{t.Prettifying}</p>
          <p>{t.ResponseSection}</p>
        </div>
      </div>
      <div>
        <p style={{ margin: '20px' }}>{t.HowToUseGraphQLPlayground}?</p>
        <p style={{ margin: '20px' }}>{t.PlaygroundDescription}</p>
        <div style={{ margin: '20px' }}>
          <p>{t.WriteYourQueryOrMutation}</p>
          <p>{t.ExampleQuery}</p>
          <pre>{t.ExampleQueryCode}</pre>
        </div>
        <p style={{ margin: '20px' }}>{t.UseVariables}</p>
        <p style={{ margin: '20px' }}>{t.VariablesDescription}</p>
        <div style={{ margin: '20px' }}>
          <p>{t.ExampleWithVariables}</p>
          <pre>{t.ExampleWithVariablesCode}</pre>
          <p>{t.Variables}:</p>
          <pre>{t.VariablesCode}</pre>
        </div>
      </div>
    </section>
  );
};
