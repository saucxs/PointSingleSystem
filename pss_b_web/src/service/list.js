import { reqHandle } from "../common/ajax";

import { LIST_URL , URL} from "./config";

export default {
  listGetReq: (param)=> reqHandle(`${LIST_URL}/${param}`)(),
  listItemDel: (param) => reqHandle(`${URL}/${param}`, {
    method: 'DELETE'
  })
};
