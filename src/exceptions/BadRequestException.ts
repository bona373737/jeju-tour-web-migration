/** 
 * @Filename: BadRequestException.js
 * @Description: 400 에러 예외 처리
 */
class BadRequestException extends Error {
    constructor(msg = '잘못된 요청 입니다.', field = null) {
        super(msg);
        // 멤버변수 추가
        this._statusCode = 400;
        this._field = field;
    }

    get statusCode() {
        return this._statusCode;
    }

    get field() {
        return this._field;
    }

    set field(params) {
        this._field = params;
    }
}

export default BadRequestException;