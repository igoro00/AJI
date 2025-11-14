export class HttpError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// 1xx Informational (rarely used)
export class Continue extends HttpError { constructor(msg?: string) { super(100, msg || 'Continue'); } }
export class SwitchingProtocols extends HttpError { constructor(msg?: string) { super(101, msg || 'Switching Protocols'); } }
export class Processing extends HttpError { constructor(msg?: string) { super(102, msg || 'Processing'); } }

// 2xx Success
export class OK extends HttpError { constructor(msg?: string) { super(200, msg || 'OK'); } }
export class Created extends HttpError { constructor(msg?: string) { super(201, msg || 'Created'); } }
export class Accepted extends HttpError { constructor(msg?: string) { super(202, msg || 'Accepted'); } }
export class NonAuthoritativeInformation extends HttpError { constructor(msg?: string) { super(203, msg || 'Non Authoritative Information'); } }
export class NoContent extends HttpError { constructor(msg?: string) { super(204, msg || 'No Content'); } }
export class ResetContent extends HttpError { constructor(msg?: string) { super(205, msg || 'Reset Content'); } }
export class PartialContent extends HttpError { constructor(msg?: string) { super(206, msg || 'Partial Content'); } }
export class MultiStatus extends HttpError { constructor(msg?: string) { super(207, msg || 'Multi Status'); } }
export class AlreadyReported extends HttpError { constructor(msg?: string) { super(208, msg || 'Already Reported'); } }
export class IMUsed extends HttpError { constructor(msg?: string) { super(226, msg || 'IM Used'); } }

// 3xx Redirection
export class MultipleChoices extends HttpError { constructor(msg?: string) { super(300, msg || 'Multiple Choices'); } }
export class MovedPermanently extends HttpError { constructor(msg?: string) { super(301, msg || 'Moved Permanently'); } }
export class Found extends HttpError { constructor(msg?: string) { super(302, msg || 'Found'); } }
export class SeeOther extends HttpError { constructor(msg?: string) { super(303, msg || 'See Other'); } }
export class NotModified extends HttpError { constructor(msg?: string) { super(304, msg || 'Not Modified'); } }
export class UseProxy extends HttpError { constructor(msg?: string) { super(305, msg || 'Use Proxy'); } }
export class TemporaryRedirect extends HttpError { constructor(msg?: string) { super(307, msg || 'Temporary Redirect'); } }
export class PermanentRedirect extends HttpError { constructor(msg?: string) { super(308, msg || 'Permanent Redirect'); } }

// 4xx Client errors
export class BadRequest extends HttpError { constructor(msg?: string) { super(400, msg || 'Bad Request'); } }
export class Unauthorized extends HttpError { constructor(msg?: string) { super(401, msg || 'Unauthorized'); } }
export class PaymentRequired extends HttpError { constructor(msg?: string) { super(402, msg || 'Payment Required'); } }
export class Forbidden extends HttpError { constructor(msg?: string) { super(403, msg || 'Forbidden'); } }
export class NotFound extends HttpError { constructor(msg?: string) { super(404, msg || 'Not Found'); } }
export class MethodNotAllowed extends HttpError { constructor(msg?: string) { super(405, msg || 'Method Not Allowed'); } }
export class NotAcceptable extends HttpError { constructor(msg?: string) { super(406, msg || 'Not Acceptable'); } }
export class ProxyAuthenticationRequired extends HttpError { constructor(msg?: string) { super(407, msg || 'Proxy Authentication Required'); } }
export class RequestTimeout extends HttpError { constructor(msg?: string) { super(408, msg || 'Request Timeout'); } }
export class Conflict extends HttpError { constructor(msg?: string) { super(409, msg || 'Conflict'); } }
export class Gone extends HttpError { constructor(msg?: string) { super(410, msg || 'Gone'); } }
export class LengthRequired extends HttpError { constructor(msg?: string) { super(411, msg || 'Length Required'); } }
export class PreconditionFailed extends HttpError { constructor(msg?: string) { super(412, msg || 'Precondition Failed'); } }
export class PayloadTooLarge extends HttpError { constructor(msg?: string) { super(413, msg || 'Payload Too Large'); } }
export class URITooLong extends HttpError { constructor(msg?: string) { super(414, msg || 'URI Too Long'); } }
export class UnsupportedMediaType extends HttpError { constructor(msg?: string) { super(415, msg || 'Unsupported Media Type'); } }
export class RangeNotSatisfiable extends HttpError { constructor(msg?: string) { super(416, msg || 'Range Not Satisfiable'); } }
export class ExpectationFailed extends HttpError { constructor(msg?: string) { super(417, msg || 'Expectation Failed'); } }
export class ImATeapot extends HttpError { constructor(msg?: string) { super(418, msg || 'Im A Teapot'); } }
export class MisdirectedRequest extends HttpError { constructor(msg?: string) { super(421, msg || 'Misdirected Request'); } }
export class UnprocessableEntity extends HttpError { constructor(msg?: string) { super(422, msg || 'Unprocessable Entity'); } }
export class Locked extends HttpError { constructor(msg?: string) { super(423, msg || 'Locked'); } }
export class FailedDependency extends HttpError { constructor(msg?: string) { super(424, msg || 'Failed Dependency'); } }
export class TooEarly extends HttpError { constructor(msg?: string) { super(425, msg || 'Too Early'); } }
export class UpgradeRequired extends HttpError { constructor(msg?: string) { super(426, msg || 'Upgrade Required'); } }
export class PreconditionRequired extends HttpError { constructor(msg?: string) { super(428, msg || 'Precondition Required'); } }
export class TooManyRequests extends HttpError { constructor(msg?: string) { super(429, msg || 'Too Many Requests'); } }
export class RequestHeaderFieldsTooLarge extends HttpError { constructor(msg?: string) { super(431, msg || 'Request Header Fields Too Large'); } }
export class UnavailableForLegalReasons extends HttpError { constructor(msg?: string) { super(451, msg || 'Unavailable For Legal Reasons'); } }

// 5xx Server errors
export class InternalServerError extends HttpError { constructor(msg?: string) { super(500, msg || 'Internal Server Error'); } }
export class NotImplemented extends HttpError { constructor(msg?: string) { super(501, msg || 'Not Implemented'); } }
export class BadGateway extends HttpError { constructor(msg?: string) { super(502, msg || 'Bad Gateway'); } }
export class ServiceUnavailable extends HttpError { constructor(msg?: string) { super(503, msg || 'Service Unavailable'); } }
export class GatewayTimeout extends HttpError { constructor(msg?: string) { super(504, msg || 'Gateway Timeout'); } }
export class HTTPVersionNotSupported extends HttpError { constructor(msg?: string) { super(505, msg || 'HTTP Version Not Supported'); } }
export class VariantAlsoNegotiates extends HttpError { constructor(msg?: string) { super(506, msg || 'Variant Also Negotiates'); } }
export class InsufficientStorage extends HttpError { constructor(msg?: string) { super(507, msg || 'Insufficient Storage'); } }
export class LoopDetected extends HttpError { constructor(msg?: string) { super(508, msg || 'Loop Detected'); } }
export class NotExtended extends HttpError { constructor(msg?: string) { super(510, msg || 'Not Extended'); } }
export class NetworkAuthenticationRequired extends HttpError { constructor(msg?: string) { super(511, msg || 'Network Authentication Required'); } }