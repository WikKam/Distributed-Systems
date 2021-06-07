import {OperationResult} from "../../proto/markdown_editor_pb";

export class OperationResultUtil {
    static createSuccessful(): OperationResult{
        let result = new OperationResult();
        result.setSuccessful(true);
        return result;
    }

    static createUnSuccessful(errMsg: string): OperationResult{
        let result = new OperationResult();
        result.setSuccessful(false);
        result.setErrormsg(errMsg);
        return result;
    }
}