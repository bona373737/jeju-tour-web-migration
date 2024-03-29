/**
 * @Filename: useQueryString.js
 * @Description: QueryString 문자열 취득을 도와줄 함수
 */
import { useLocation } from "react-router-dom";

const useQueryString = (props) => {
    // QueryString 문자열 추출함
    const { search } = useLocation();
    // QueryString 문자열을 객체로 변환
    const params = new URLSearchParams(search);
    // 모든 key와 value의 쌍을 for ...in 반복문으로 처리 가능한 [key, value]쌍의 배열로 반환함.
    const entries = params.entries();

    // 리턴할 빈 객체
    const result = {};

    // 추출한 배열을 반복문으로 처리하여 JSON객체로 변환함
    for (const [key, value] of entries) {
        result[key] = value;
    }

    // 추출된 결과에서 props에 설정된 key가 없다면 props의 값으로 대체함
    for (const p in props) {
        // hasOwnProperty로 result에서 p(key)가 있는지 확인 후 없다면?
        if (!result.hasOwnProperty(p)) {
            // result[key] = props[key]; --> p는 props의 key값
            result[p] = props[p];
        }
    }

    return result;
};

export { useQueryString };
