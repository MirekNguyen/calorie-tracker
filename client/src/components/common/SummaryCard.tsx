import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

type Props = {
  title: string;
  summary: string;
};

export const SummaryCard: FC<Props> = ({ title, summary }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>{summary}</Label>
      </CardContent>
    </Card>
  );
};
