import { Observable, Observer } from 'rxjs';

export function extensionFromHeader(header: string): string[] {
  switch (header) {
    case '89504E47': //   type = "image/png";
      return ['png'];
    case 'FFD8FF':
      return ['jpg'];
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFE2':
    case 'FFD8FFE3':
    case 'FFD8FFE8':
      return ['jpeg'];
    case '47494638':
      return ['gif'];
    case '49492A00':
      return ['tif'];
    case '424D':
      return ['bmp'];
    case '41433130':
      return ['dwg'];
    case '38425053':
      return ['psd'];
    case '7B5C727466':
      return ['rtf'];
    case '3C3F786D6C':
      return ['xml'];
    case '68746D6C3E':
      return ['html'];
    case '44656C69766572792D646174653A':
      return ['eml'];
    case '2142444E':
      return ['pst'];
    case 'D0CF11E0':
      return ['xls', 'doc'];
    case '252150532D41646F6265':
      return ['eps', 'ps'];
    case '255044462D312E':
      return ['pdf'];
    case 'AC9EBD8F':
      return ['qdf'];
    case '504B0304':
      return ['zip'];
    case '52617221':
      return ['rar'];
    case '57415645':
      return ['wav'];
    case '41564920':
      return ['avi'];
    case '2E7261FD':
      return ['ram'];
    case '2E524D46':
      return ['rm'];
    case '000001BA':
      return ['mpg'];
    case '000001B3':
      return ['mpg'];
    case '6D6F6F76':
      return ['mov'];
    case '3026B2758E66CF11':
      return ['asf'];
    default:
      return [];
  }
}

export function requiredFileType(
  file: File,
  allowedType: string,
): Observable<{ [key: string]: any }> {
  // eslint-disable-next-line no-plusplus
  const allowedList = allowedType.replace('.', '').split(',');
  const fileReader = new FileReader();
  return Observable.create((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      header = header.toUpperCase();
      const uploadedFileType = extensionFromHeader(header);
      if (allowedList.some((ai) => uploadedFileType.includes(ai))) {
        // @ts-ignore
        observer.error(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
}

export function requiredFileSize(file: File, maxSize: number): { [key: string]: any } | null {
  // eslint-disable-next-line no-plusplus
  if (file.size >= maxSize * 1024) {
    return { maxSize: true };
  }

  return null;
}
