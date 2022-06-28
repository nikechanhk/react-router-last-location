import { createContext } from 'react';
import { Location } from 'react-router-dom';

export type LastLocationType = null | Location;

const LastLocationContext = createContext<LastLocationType>(null);

export default LastLocationContext;
