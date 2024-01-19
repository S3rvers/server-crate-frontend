import { createAction, props } from "@ngrx/store";
import { Attribute, BulkAttribute, StoreVariant, UpdateAttribute, UploadResponse } from "../../../types";

export const uploadImage = createAction('[upload] upload image', props<{ form: FormData, id: string }>())

export const gotImage = createAction('[upload] got image url', props<{ url: string, id: string }>())

export const addAttributeToStore = createAction('[attribute] adding attribute to store', props<StoreVariant>())

export const addAttribute = createAction('[attribute] sending attribute to server', props<BulkAttribute>())

export const updateAttributesInStore = createAction('[attribute] update attribute in store', props<{ attributes: StoreVariant[]}>())

export const getAttributes = createAction('[attribute] get attributes')
export const gotAttributes = createAction('[attribute] got attributes', props<{attributes: Attribute[]}>())

export const deleteAttributeOption = createAction('[attribute] delete attribute option', props<{optionId: string }>())
export const deleteAttribute = createAction('[attribute] delete attribute', props<{attributeId: string }>())

export const resetAttributeCreation = createAction('[attribute] reset attribute')

export const updateAttribute = createAction('[attribute] update attribute', props<UpdateAttribute>())

export const deleteMultipleAttributes = createAction('[attribute] delete multiple attributes', props<{ deleteList: string[] }>())

export const deleteAll = createAction('[attribute] delete all')