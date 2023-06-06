import { config, env, routes } from '@constants/index'
import { TestElementType } from '@constants/test'
import { VideoSearchParamResolutionType } from '@lib/video/types'
import * as translations from '@locales/en.json'
import { parse } from 'node-html-parser'
import { FetcherPropsType } from './types'

/*
 * Replaces occurrences in the string by given object
 *
 * */
export function replace(str: string, obj: { [key: string]: any }): string {
   for (let key in obj) str = str.replace(new RegExp('\\{' + key + '\\}', 'gm'), obj[key])

   return str.toString()
}

/*
 * Returns real route path by given props
 *
 * */
type RouteArgsType = {
   path: string
   segments?: { [key: string]: any }
   params?: { [key: string]: any }
   host?: boolean
}

export function route({ path, segments, params, host }: RouteArgsType): string {
   for (const key in segments) path = path.replace(`:${key}`, segments[key])

   if (isFilled(params)) {
      const queryString = new URLSearchParams(params)

      path += `?${queryString.toString()}`
   }

   if (host) path = `${env.public.APP_URL}${path}`

   return path
}

/*
 * Returns translation text
 *
 * */
export function trans(key: string, segments?: { [key: string]: any }, count?: number): string {
   let translation: any = translations

   if (typeof count === 'number') {
      if (count === 1) {
         key += '.singular'
      } else if (count > 1 || count === 0) {
         key += '.plural'
      }
   }

   for (const k of key.split('.')) if (translation[k] !== undefined) translation = translation[k]

   if (typeof translation !== 'string') return ''

   for (const segment in segments) translation = translation.replace(`:${segment}`, segments[segment])

   return translation as never
}

/*
 * Converts the string to title case
 *
 * */
export function titleCase(string: string): string {
   const alwaysUppercase = config.alwaysUppercase

   if (alwaysUppercase.includes(string.toLowerCase())) {
      return string.toUpperCase()
   }

   return string
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

/*
 * Converts first letter of the string to lower case
 *
 * */
export function lowerCaseFirst(string: string | undefined): string {
   if (!string) return ''

   return string.charAt(0).toLowerCase() + string.slice(1)
}

/*
 * Checks whether the process is running client-side or server-side.
 *
 * */
export function isServerSide(): boolean {
   return typeof window === 'undefined'
}

/*
 * Checks whether the process is running client-side or server-side.
 *
 * */
export function isClientSide(): boolean {
   return !isServerSide()
}

/*
 * Returns given ID if it's development mode
 *
 * */
export function testId(element: TestElementType): string | undefined {
   return element?.id
}

/*
 * Converts the given plain source code to DOM content
 *
 * */
export function parseDOM(source: string) {
   return parse(source)
}

/*
 * Trims the string by given char or phrase
 *
 * */
export function trim(str: string, remove: string): string {
   return trimRight(trimLeft(str, remove), remove)
}

/*
 * Trims left of the string by given char or phrase
 *
 * */
export function trimLeft(str: string, remove: string): string {
   if (remove === undefined) remove = 's'

   return str.replace(new RegExp('^[' + remove + ']+'), '')
}

/*
 * Trims right of the string by given char or phrase
 *
 * */
export function trimRight(str: string, remove: string): string {
   if (remove === undefined) remove = 's'

   return str.replace(new RegExp('[' + remove + ']+$'), '')
}

/*
 * Sums all the numbers in the array by given prop
 *
 * */
export function sumProps(arr: [], prop: string): number {
   return arr.reduce((a, b) => {
      return a + b[prop]
   }, 0)
}

/*
 * Sums all the numbers in an array of numbers
 *
 * */
export function sumArr(arr: number[]): number {
   return arr.reduce((a, b) => {
      return a + b
   }, 0)
}

/*
 * Sums all array sizes in the parent array by given prop
 *
 * */
export function sumLength(arr: any[], prop: string): number {
   return arr.reduce((a, b: any) => {
      return a + b[prop]?.length || 0
   }, 0)
}

/*
 * A typical debounce function
 *
 * */
export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
   let timeout: number

   return function (this: any, ...args: any[]) {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => fn.apply(this, args), delay)
   } as F
}

/*
 * Filters array by uniqueness
 *
 * */
export function arrayUnique(arr: any[]): any[] {
   return arr.filter((v, i, a) => a.indexOf(v) === i)
}

/*
 * Returns a random item from given array
 *
 * */
export function arrayRandom(arr: any[]): any {
   return arr[Math.floor(Math.random() * arr.length)]
}

/*
 * Chunks array into given sizes equally
 *
 * */
export function arrayChunk(arr: any[], size: number): any[] {
   return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
}

/*
 * Distributes array items to the columns
 *
 * */
export function arrayColumnize(arr: any[], cols: number): any[] {
   let i = 0

   const columns = new Array(cols).fill([]).map(() => [])

   arr.forEach(item => {
      if (i === cols) i = 0

      columns[i].push(item as never)

      i++
   })

   return columns
}

/*
 * Checks if the object has any true prop
 *
 * */
export function hasAnyTrueProperty(obj: object, props: any[]): boolean {
   for (const key of props) if (isTrue(obj[key as never])) return true

   return false
}

/*
 * Checks if the object has any of the given props
 *
 * */
export function hasOwnAnyProperty(obj: object, props: any[]): boolean {
   for (const prop of props) if (obj.hasOwnProperty(prop)) return true

   return false
}

/*
 * Checks if the object has all the given props
 *
 * */
export function hasOwnProperties(obj: object, props: any[]): boolean {
   for (const prop of props) if (!obj?.hasOwnProperty(prop)) return false

   return true
}

/*
 * Clones the object/array without reference
 *
 * */
export function cloneDeep<T>(data: T): T {
   return JSON.parse(JSON.stringify(data))
}

/*
 * Returns only filled items in the object
 *
 * */
export function filterFilled(obj: object): object {
   return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
         return isFilled(value)
      })
   )
}

/*
 * Sorts the object by A-Z and 0-9
 *
 * */
export function sortObject(obj: object): object {
   return Object.fromEntries(
      Object.entries(obj).sort(([a], [b]) => {
         if (a > b) {
            return 1
         }
         if (b > a) {
            return -1
         }
         return 0
      })
   )
}

/*
 * Adds given prefix to each object key
 *
 * */
export function prefixKeys(obj: { [key: string]: any }, prefix: string): object {
   const transformed: { [key: string]: any } = {}

   for (const key in obj) {
      transformed[prefix + key] = obj[key]
   }

   return transformed
}

/*
 * Moves a property from object to another object
 *
 * */
export function moveProp(from: object, to: object, prop: never): void {
   if (prop in from) {
      to[prop] = from[prop]

      delete from[prop]
   }
}

/*
 * Intercepts the process flow for given milliseconds
 *
 * */
export function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms))
}

/*
 * Encodes given string
 *
 * */
export function encodeStr(str: string) {
   return btoa(encodeURIComponent(str.toString()))
}

/*
 * Checks if the given value is filled or empty
 *
 * */
export function isFilled(val: any): boolean {
   switch (typeof val) {
      case 'object':
         return !!Object.keys(val || []).length

      case 'boolean':
      case 'number':
         return true

      default:
         return !!val
   }
}

/*
 * Checks if the given value is truthy or falsy
 *
 * */
export function isTrue(val: any): boolean {
   switch (val) {
      case 'true' || '1':
         return true

      case 'false' || '0':
         return false

      default:
         return !!val
   }
}

/*
 * Returns value of the parameter by given prop
 *
 * */
export function paramVal(params: any, prop: any): any {
   if (typeof prop === 'object')
      return prop.map((v: string) => {
         return params[v]
      })

   if (typeof params !== 'object') return prop

   return params[prop]
}

/*
 * Converts seconds to H:M:S format
 *
 * */
export function formatDuration(seconds: number): string {
   let str = ''

   const h = Math.floor(seconds / 3600)
         .toString()
         .padStart(2, '0'),
      m = Math.floor((seconds % 3600) / 60)
         .toString()
         .padStart(2, '0'),
      s = Math.floor(seconds % 60)
         .toString()
         .padStart(2, '0')

   if (Number(h)) str += `${h}:`

   str += `${m}:${s}`

   return str
}

/*
 * Converts H:M:S format to seconds
 *
 * */
export function toSeconds(time: string): number {
   if (!time) return 0

   let p: any = time.split(':'),
      s = 0,
      m = 1

   while (p.length > 0) {
      s += m * parseInt(p.pop(), 10)
      m *= 60
   }

   return s
}

/*
 * Returns resolution name by given width and height
 *
 * */
export function resolutionName(width: number, height: number): keyof VideoSearchParamResolutionType | null {
   const sum = Number(width) + Number(height)

   if (isNaN(sum)) return null

   if (sum < 2900) return 'SD'

   if (sum < 5900) return 'HD'

   return '4K'
}

/*
 * Client-side error handler
 *
 * */
export function errorHandler(error: Error, context?: string): void {
   if (error.name === 'AbortError') return

   try {
      void fetcher({
         url: route({ path: routes.api.log.create.path }),
         method: routes.api.log.create.method,
         data: {
            name: error.name,
            stack: error.stack,
            message: error.message,
            context: context,
            path: window?.location.href
         }
      })
   } catch (e) {}

   if (env.private.APP_ENV !== 'production') {
      console.error(error)

      throw error
   }
}

/*
 * Custom fetch function
 *
 * */
export async function fetcher({ url, method, data, mode, headers, signal, json }: FetcherPropsType): Promise<Response> {
   const init: RequestInit = {
      method: method || 'GET',
      headers: headers || {},
      signal: signal || null,
      mode: mode || 'cors'
   }

   if (isFilled(data)) {
      for (const key in data) {
         if (typeof data[key] === 'string') data[key] = data[key].trim()
      }

      if (init.method === 'GET') {
         const params = new URLSearchParams(data)

         url += `?${params.toString()}`
      } else {
         init.body = JSON.stringify(data)
      }
   }

   if (json !== false) init.headers = Object.assign(init.headers as object, { 'Content-Type': 'application/json' })

   return await fetch(url, init)
}
