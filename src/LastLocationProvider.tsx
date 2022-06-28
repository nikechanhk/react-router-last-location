import * as React from 'react';
import { Location, useLocation } from 'react-router-dom';
import LastLocationContext, { LastLocationType } from './LastLocationContext';
import { hasBeenPrevented, prevent, shouldPrevent } from './prevent';

let lastLocation: LastLocationType = null;

type UpdateLastLocation = {
  location: LastLocationType;
  nextLocation: Location;
  watchOnlyPathname: boolean;
};

const updateLastLocation = ({ location, nextLocation, watchOnlyPathname }: UpdateLastLocation) => {
  if (location === null) {
    return;
  }

  if (nextLocation === location) {
    return;
  }

  if (watchOnlyPathname && location.pathname === nextLocation.pathname) {
    return;
  }

  if (shouldPrevent(nextLocation) && !hasBeenPrevented(nextLocation)) {
    prevent(nextLocation);
    return;
  }

  lastLocation = { ...location };
};

interface Props {
  watchOnlyPathname: boolean;
}

const LastLocationProvider: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, watchOnlyPathname } = props;
  const [currentLocation, setCurrentLocation] = React.useState<LastLocationType>(null);

  const newLocation = useLocation();

  React.useEffect(() => {
    updateLastLocation({
      location: currentLocation,
      nextLocation: newLocation,
      watchOnlyPathname,
    });

    setCurrentLocation(newLocation);
  }, [newLocation, watchOnlyPathname]);

  return (
    <LastLocationContext.Provider value={lastLocation}>{children}</LastLocationContext.Provider>
  );
};

LastLocationProvider.defaultProps = {
  watchOnlyPathname: false,
};

export const getLastLocation = () => lastLocation;

export const setLastLocation = (nextLastLocation: LastLocationType) => {
  lastLocation = nextLastLocation;
};

export default LastLocationProvider;
