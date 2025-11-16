import { Button } from '@shared/components/Button';
import { Card } from '@shared/components/Card';
import { Header } from '@shared/components/Header';
import { Input } from '@shared/components/Input';

import { Container, Form, InputsWrapper, Title } from './styles';
import { GenderSelector } from './components/GenderSelector';
import { nanoid } from 'nanoid';
import { LoginProps, UserProvidedAthlete } from './types';

function assertsFormDataIsAthlete(data: {
  [k: string]: FormDataEntryValue;
}): asserts data is UserProvidedAthlete {
  if (
    !('name' in data) ||
    typeof data['name'] !== 'string' ||
    !('gender' in data) ||
    (data['gender'] !== 'female' && data['gender'] !== 'male')
  ) {
    throw new Error('Invalid form data');
  }
}

export function Login({ onSubmit }: LoginProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    assertsFormDataIsAthlete(data);

    const userId = nanoid();

    onSubmit({ name: data.name, gender: data.gender, id: userId });
  }
  return (
    <Container>
      <Header title="Seja bem vindo(a) ao Minha vez!" />
      <Card variant="body">
        <Form onSubmit={handleSubmit}>
          <Title variant="h2" color="text.heading.dark">
            Para começar, insira o seu nome
          </Title>
          <InputsWrapper>
            <Input placeholder="Seu nome" label="Nome" name="name" />
            <GenderSelector />
          </InputsWrapper>
          <Button label="Acessar" type="submit" />
        </Form>
      </Card>
    </Container>
  );
}
