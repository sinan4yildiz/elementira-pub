export interface TestServiceInterface {
   readonly options: Partial<CypressCommandLine.CypressRunOptions>

   run(): Promise<void>
}
