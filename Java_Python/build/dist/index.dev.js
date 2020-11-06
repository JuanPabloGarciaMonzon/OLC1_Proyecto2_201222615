"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var cors_1 = __importDefault(require("cors"));

var gramatica_route_1 = __importDefault(require("./routes/gramatica.route"));

var app = express_1["default"]();
app.set('port', process.env.PORT || 4000);
app.use(express_1["default"].json({
  limit: '50mb'
}));
app.use(express_1["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cors_1["default"]());
app.use('/jison', gramatica_route_1["default"]);
app.get('**', function (req, res) {
  res.send("Servidor Jison");
});
app.listen(app.get('port'), function () {
  console.log("Server on port ".concat(app.get('port')));
});