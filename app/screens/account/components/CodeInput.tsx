import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';

import { Space } from '@app/components/Space';

import { SubmitButton } from './SubmitButton';

type Props = {
  submitCode: (OTP: string) => Promise<void>;
  submitting: boolean;
};

const InputField = React.forwardRef<RNTextInput, React.ComponentProps<typeof RNTextInput>>((props, ref) => {
  return (
    <InputFieldContainer>
      <Input
        // @ts-ignore
        ref={ref}
        keyboardType="numeric"
        maxLength={1}
        {...props}
      />
    </InputFieldContainer>
  );
});

export const CodeInput = ({ submitCode, submitting }: Props) => {
  const [code, setCode] = useState<string[]>([]);

  const inputFieldOne = useRef<RNTextInput>(null);
  const inputFieldTwo = useRef<RNTextInput>(null);
  const inputFieldThree = useRef<RNTextInput>(null);
  const inputFieldFour = useRef<RNTextInput>(null);
  const inputFieldFive = useRef<RNTextInput>(null);
  const inputFieldSix = useRef<RNTextInput>(null);

  const handleInput = (index: number, focus: () => void) => (value: string) => {
    setCode(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });

    if (value) {
      focus();
    }
  };

  const handleSubmit = (OTP: string) => {
    if (OTP.length < 6) {
      return;
    }

    submitCode(OTP);
  };

  return (
    <>
      <Container>
        <InputField
          ref={inputFieldOne}
          editable={!submitting}
          onChangeText={handleInput(0, () => inputFieldTwo?.current?.focus())}
        />
        <Space horizontal units={2} />
        <InputField
          ref={inputFieldTwo}
          editable={!submitting}
          onChangeText={handleInput(1, () => inputFieldThree?.current?.focus())}
        />
        <Space horizontal units={2} />
        <InputField
          ref={inputFieldThree}
          editable={!submitting}
          onChangeText={handleInput(2, () => inputFieldFour?.current?.focus())}
        />
        <Space horizontal units={2} />
        <InputField
          ref={inputFieldFour}
          editable={!submitting}
          onChangeText={handleInput(3, () => inputFieldFive?.current?.focus())}
        />
        <Space horizontal units={2} />
        <InputField
          ref={inputFieldFive}
          editable={!submitting}
          onChangeText={handleInput(4, () => inputFieldSix?.current?.focus())}
        />
        <Space horizontal units={2} />
        <InputField
          ref={inputFieldSix}
          editable={!submitting}
          onChangeText={value => {
            if (value) {
              setCode(prev => [...prev, value]);
              const OTP = [...code, value].join('');
              handleSubmit(OTP);
            }
          }}
        />
      </Container>
      <SubmitButton onPress={() => submitCode(code.join(''))} submitting={submitting} />
    </>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const InputFieldContainer = styled.View`
  border-color: ${({ theme }) => theme.colours.purple100};
  border-width: 2px;
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  align-items: center;
`;

const Input = styled.TextInput`
  font-size: 40px;
  padding: 10px;
  color: ${({ theme }) => theme.colours.purple100};
`;
