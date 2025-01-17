import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electron', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APis you need here.
  // ...

  getAvailableStorage: async () => ipcRenderer.invoke('get-available-storage'),
  setOfferedStorage: async (storage: number) => ipcRenderer.invoke('set-offered-storage', storage),
  openOfferedStorage: () => ipcRenderer.invoke('open-offered-storage'),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  onAlertTitle: (callback: (title: string) => void) => {
    ipcRenderer.on('alert-title', (_, title) => callback(title));
  },
  fetchData: () => ipcRenderer.invoke('fetch-data'),
  startMining: (challenge: string) => ipcRenderer.invoke('start-mining', challenge),
  stopMining: () => ipcRenderer.invoke('stop-mining'),
})