"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addTokenAction } from "../serverActions/git.action";
import { Button } from "@/src/components/ui/button";
import { TokenSchema, TokenType } from "@/prisma/schemas/token.schema";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { apisSources } from "@/src/lib/apiSources";

export const AccessTokenInput = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useZodForm({
    schema: TokenSchema,
    defaultValues: { token: "", description: "", apiSource: "Gitlab" },
  });

  const mutation = useMutation({
    mutationFn: async (values: TokenType) => {
      const { data, serverError } = await addTokenAction(values);

      if (serverError || !data) {
        toast({
          title: "Erreur",
          description: serverError
            ? serverError
            : "Une erreur inconnue s'est produite lors de l'enregistrement du token.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: `Token enregistré avec succès !`,
        variant: "succes",
      });
    },
  });

  return (
    <div>
      <Form
        className="flex flex-col space-y-6"
        form={form}
        onSubmit={async (values: TokenType) =>
          await mutation.mutateAsync(values)
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <FormField
            control={form.control}
            name="apiSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Catégorie</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {apisSources.map((apiSource) => {
                        return (
                          <SelectItem
                            value={apiSource.name}
                            key={apiSource.name}
                          >
                            <div className="flex items-center justify-center p-2"
                            > 
                              <img
                                className="w-6 h-6 mr-10"
                                src={apiSource.image}
                                alt={`${apiSource.name} logo`}
                              />
                              <span>{apiSource.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Personal Token Access
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-3 border border-gray-300 rounded-md w-full dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-[60%]"
                    placeholder="Entrez votre token d'accès GitLab"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="p-3 border border-gray-300 rounded-md w-full dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-[60%]"
                    placeholder="Entrez votre description"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500 dark:text-gray-400">*optional</p>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Enregistrer ce jeton
          </Button>
        </div>
      </Form>
    </div>
  );
};
