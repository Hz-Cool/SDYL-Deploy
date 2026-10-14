"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchDto = void 0;
const page_query_1 = __importDefault(require("../../utils/dto/page-query"));
class UserSearchDto extends page_query_1.default {
    username;
    nickname;
    status;
}
exports.UserSearchDto = UserSearchDto;
//# sourceMappingURL=userSearchDto.js.map