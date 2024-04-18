interface InputBmi {
    height: number;
    weight: number;
}
declare const parseArguments: (args: string[]) => InputBmi;
declare const calculateBmi: (height: number, weight: number) => any;
