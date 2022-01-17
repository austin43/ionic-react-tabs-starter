import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  triangle,
  ellipse,
  square,
  triangleOutline,
  ellipseOutline,
  squareOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

let listener = false;
const getBaseRoute = (url: string) => url.split("/")[1];

export const Tabs: React.FC = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(
    getBaseRoute(history.location.pathname)
  );

  useEffect(() => {
    let unlisten: any;
    if (!listener) {
      listener = true;
      unlisten = history.listen((newLocation) => {
        setCurrentTab(getBaseRoute(newLocation.pathname));
      });
    }

    return () => unlisten();
  }, [history]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={currentTab === "tab1" ? triangle : triangleOutline} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={currentTab === "tab2" ? ellipse : ellipseOutline} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={currentTab === "tab3" ? square : squareOutline} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
