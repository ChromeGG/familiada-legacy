// taken from https://stackoverflow.com/a/65928340/10474557
// should appear here https://github.com/sindresorhus/type-fest/issues/386
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type Indexify<T> = T & { [str: string]: undefined }

type UndefinedVals<T> = { [K in keyof T]: undefined }

type AllUnionKeys<T> = keyof UnionToIntersection<UndefinedVals<T>>

export type AllFields<T> = { [K in AllUnionKeys<T> & string]: Indexify<T>[K] }
