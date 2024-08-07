import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
  title: string;
  summary: string;
};

export const SummaryCard: FC<Props> = ({ title, summary }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};
