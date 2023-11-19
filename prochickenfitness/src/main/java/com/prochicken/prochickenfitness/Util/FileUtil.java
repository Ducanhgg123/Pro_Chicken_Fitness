package com.prochicken.prochickenfitness.Util;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class FileUtil {
    public static Byte[] compressFile(Byte[] data) {
        if (data==null){
            return null;
        }
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(ByteConverter.convertToBytePrimitiveArray(data));
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {
        }
        return ByteConverter.convertToByteWrapperArray(outputStream.toByteArray());
    }



    public static Byte[] decompressFile(Byte[] data) {
        if (data==null){
            return null;
        }
        Inflater inflater = new Inflater();
        inflater.setInput(ByteConverter.convertToBytePrimitiveArray(data));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return ByteConverter.convertToByteWrapperArray(outputStream.toByteArray());
    }
}
