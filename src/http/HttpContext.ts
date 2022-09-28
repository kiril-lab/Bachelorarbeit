import React from "react";
import LiveHttpService from "./LiveHttpService";

export const liveHttpService = new LiveHttpService();

const httpContext = React.createContext(liveHttpService);

export default httpContext;

export const HttpProvider = httpContext.Provider;
