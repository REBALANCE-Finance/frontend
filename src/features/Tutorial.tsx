"use client";
import Joyride, {
  Placement,
  CallBackProps,
  STATUS,
  EVENTS,
  Status,
  ACTIONS,
  TooltipRenderProps,
  Events
} from "react-joyride";
import { TutorialStep } from "@/types";
import { useAccount } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE_KEYS, ROUTE_PATHS } from "@/consts";
import { usePathname } from "next/navigation";
import localStore from "@/utils/localStore";
import GuideTooltip from "@/components/tooltip/GuideTooltip";

const steps: TutorialStep[] = [
  {
    target: ".step-1",
    content: "Connect your wallet here",
    spotlightClicks: true
  },
  {
    target: ".step-2",
    content: "Click on the money market to reveal details",
    spotlightClicks: true,
    disableBeacon: true,
    placement: "top" as Placement
  },
  {
    target: ".step-3",
    content:
      "This is an APY of the asset at this moment.\nIt is constantly changing. Click to see details",
    spotlightClicks: true,
    disableBeacon: true,
    placement: "top" as Placement
  },
  {
    target: ".step-4",
    content: "Here you can see the actual state and average Promethium APYs",
    disableBeacon: true
  },
  {
    target: ".step-5",
    content: "Start earning with Promethium now.\nMake your first deposit",
    disableBeacon: true,
    spotlightClicks: true
  }
];

const spotlight = {
  borderRadius: 4
};

const Tutorial = () => {
  const { address } = useAccount();
  const pathname = usePathname();
  const isConnected = !!address;
  const [isActiveTutorial, setIsActiveTutorial] = useState(
    !localStore.getData(LOCAL_STORAGE_KEYS.isShownTutorial)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [runTutorial, setRunTutorial] = useState(isActiveTutorial);

  const _steps = useMemo(() => {
    return isConnected ? steps : [steps[0]];
  }, [isConnected]);

  useEffect(() => {
    if (!isActiveTutorial) {
      setRunTutorial(false);
    }
  }, [isActiveTutorial]);

  useEffect(() => {
    if (isConnected) {
      setStepIndex(1);
    }
  }, [isConnected]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stepIndex === 3) {
      timer = setTimeout(() => {
        setStepIndex(4);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [stepIndex]);

  useEffect(() => {
    if (isActiveTutorial && pathname !== ROUTE_PATHS.lending) {
      setRunTutorial(false);
    }
  }, [isActiveTutorial, pathname]);

  useEffect(() => {
    if (isActiveTutorial && pathname.includes(ROUTE_PATHS.lendingAsset.slice(0, 9))) {
      setStepIndex(3);
      setRunTutorial(true);
    }
  }, [isActiveTutorial, pathname]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEYS.isShownTutorial) {
        const tutorialShown = localStore.getData(LOCAL_STORAGE_KEYS.isShownTutorial);
        console.log("Storage change detected:", tutorialShown);
        setIsActiveTutorial(!tutorialShown);
        setRunTutorial(!tutorialShown);
      }
    };

    const handleCustomStorageChange = (event: CustomEvent<{ key: string; value: any }>) => {
      if (event.detail.key === LOCAL_STORAGE_KEYS.isShownTutorial) {
        const tutorialShown = localStore.getData(LOCAL_STORAGE_KEYS.isShownTutorial);
        console.log("Custom storage change detected:", tutorialShown);
        setIsActiveTutorial(!tutorialShown);
        setRunTutorial(!tutorialShown);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleCustomStorageChange as EventListener);
    };
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data;
    const finishedStatuses: Status[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || action === ACTIONS.CLOSE) {
      setRunTutorial(false);
      localStore.post(LOCAL_STORAGE_KEYS.isShownTutorial, true);
    }

    if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type) &&
      pathname === ROUTE_PATHS.lending
    ) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : action === ACTIONS.NEXT ? 1 : 0));
    }
  };

  return (
    <Joyride
      steps={_steps}
      stepIndex={stepIndex}
      run={runTutorial}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      debug={false}
      hideCloseButton
      hideBackButton
      scrollOffset={140}
      scrollDuration={500}
      disableOverlayClose
      tooltipComponent={(props: TooltipRenderProps) => (
        <GuideTooltip
          stepIndex={stepIndex}
          stepsLength={5}
          showNextButton={stepIndex === 1}
          showBackButton={stepIndex === 2}
          {...props}
        />
      )}
      styles={{
        options: {
          backgroundColor: "#202327",
          textColor: "#fff",
          arrowColor: "#202327",
          primaryColor: "rgb(63, 63, 63)",
          spotlightShadow:
            "0 0 20px 10px rgba(0, 0, 0, 0.5), 0 0 40px 20px rgba(0, 0, 0, 0.3), 0 0 60px 30px rgba(0, 0, 0, 0.1)"
        },
        beaconInner: {
          backgroundColor: "rgb(76, 255, 148)"
        },
        beaconOuter: {
          border: "2px solid rgb(76, 255, 148)"
        },
        tooltip: {
          borderRadius: "12px",
          fontSize: "18px",
          width: "fit-content"
        },
        spotlight: {
          ...spotlight,
          zIndex: 9999,
          backdropFilter: "none",
          transform: "translateZ(0)"
        }
      }}
    />
  );
};

export default Tutorial;
