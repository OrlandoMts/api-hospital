import "module-alias/register";

import AppServer from "./start/server";

const _instanceServ = AppServer.instance;
_instanceServ.run();
