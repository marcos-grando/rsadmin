import { KEY_ALL_CONST, KEY_CREATE_CONST, KEY_CREATE_RESID, KEY_DELETE_CONST, KEY_DELETE_RESID, KEY_SELECT_CONST, KEY_SELECT_RESID, KEY_UPDATE_CONST, KEY_UPDATE_RESID } from "../../../shared/theMasterKeys";

import { useCreateItem } from "./crud/useCreateItem";
import { useReadItem } from "./crud/useReadItem";
import { useUpdateItem } from "./crud/useUpdateItem";
import { useDeleteItem } from "./crud/useDeleteItem";


export function useReadResid(id) {
    return useReadItem(id, KEY_SELECT_RESID);
};
export function useCreateResid() {
    const exec = useCreateItem(KEY_CREATE_RESID, KEY_ALL_CONST);
    return { ...exec, createResid: exec.createItem };
};
export function useUpdateResid() {
    const exec = useUpdateItem(KEY_UPDATE_RESID, KEY_ALL_CONST);
    return { ...exec, updateResid: exec.updateItem };
};
export function useDeleteResid() {
    const exec = useDeleteItem(KEY_DELETE_RESID, KEY_ALL_CONST);
    return { deleteResid: exec.deleteItem };
};


export function useReadConst(id) {
    return useReadItem(id, KEY_SELECT_CONST);
};
export function useCreateConst() {
    const exec = useCreateItem(KEY_CREATE_CONST, KEY_ALL_CONST);
    return { ...exec, createConst: exec.createItem };
};
export function useUpdateConst() {
    const exec = useUpdateItem(KEY_UPDATE_CONST, KEY_ALL_CONST);
    return { ...exec, updateConst: exec.updateItem };
};
export function useDeleteConst() {
    const exec = useDeleteItem(KEY_DELETE_CONST, KEY_ALL_CONST);
    return { deleteConst: exec.deleteItem };
};