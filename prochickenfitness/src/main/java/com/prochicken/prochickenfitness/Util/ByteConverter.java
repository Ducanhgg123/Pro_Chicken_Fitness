package com.prochicken.prochickenfitness.Util;

import java.util.stream.IntStream;

public class ByteConverter {
    public static Byte[] convertToByteWrapperArray(byte[] byteArray) {
        return IntStream.range(0, byteArray.length)
                .mapToObj(i -> byteArray[i])
                .toArray(Byte[]::new);
    }

    public static byte[] convertToBytePrimitiveArray(Byte[] wrapperArray) {
        if (wrapperArray==null){
            return new byte[0];
        }
        byte[] byteArray = new byte[wrapperArray.length];
        for (int i = 0; i < wrapperArray.length; i++) {
            byteArray[i] = wrapperArray[i];
        }
        return byteArray;
    }
}
